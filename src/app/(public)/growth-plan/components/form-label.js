export const formLabel = (label, required=false) => (
    <>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </>
  );