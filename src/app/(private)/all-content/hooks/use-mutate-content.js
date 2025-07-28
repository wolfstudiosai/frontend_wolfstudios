const revalidateAllContentLists = async () => {
    const keysToMutate = [];

    for (const key of cache.keys()) {
        const serializedKey = typeof key === 'string' ? key : unstable_serialize(key);
        if (serializedKey.toLowerCase().includes('content')) {
            keysToMutate.push(key);
        }
    }

    console.log("Mutating keys:", keysToMutate);

    // Get the updated content first
    const updatedContent = await fetchUpdatedContent(); // Implement this

    return Promise.all(
        keysToMutate.map((key) => {
            // For each key, transform the data with the updated content
            return mutate(key, async (currentData) => {
                if (!currentData) return currentData;

                // Handle different response structures
                if (Array.isArray(currentData)) {
                    return currentData.map(item =>
                        item.id === updatedContent.id ? updatedContent : item
                    );
                } else if (currentData.data && Array.isArray(currentData.data)) {
                    return {
                        ...currentData,
                        data: currentData.data.map(item =>
                            item.id === updatedContent.id ? updatedContent : item
                        )
                    };
                } else if (currentData.data && currentData.data.id === updatedContent.id) {
                    return {
                        ...currentData,
                        data: updatedContent
                    };
                }
                return currentData;
            }, { revalidate: false }); // Don't revalidate immediately
        })
    );
}