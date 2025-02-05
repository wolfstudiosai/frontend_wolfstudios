import { api } from '@/utils/api';
import { getSearchQueryPortfolio } from '@/utils/helper';
import { toast } from 'sonner';

export const getPortfolios = async (queryParams) => {
  try {
    const searchQuery = getSearchQueryPortfolio(queryParams);
    const res = await api.get(`/portfolios/${searchQuery}`);

    return {
      success: true,
      data: res.data.data,
      totalPortfolios: res.data.meta.total,
    };
  } catch (error) {
    toast.error(error.message);

    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const getPortfolioById = async (id) => {
  try {
    const result = await api.get(`/portfolios/${id}`);
    return { success: true, data: result.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.message || 'An unknown error occurred' };
  }
};

export const createPortfolio = async (data) => {
  try {
    const res = await api.post('/portfolios/add-portfolio', data);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updatePortfolio = async (data) => {
  const cleanedData = { ...data };
  delete cleanedData.created_at;
  delete cleanedData.updated_at;
  delete cleanedData.created_by;
  try {
    const res = await api.patch(`/portfolios/update-portfolio/${data.id}`, cleanedData);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deletePortfolio = async (id) => {
  const ids = Array.isArray(id) ? id : [id];
  try {
    const res = await api.delete(`/portfolios/delete-portfolio`, { data: { ids } });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

// static data
// const portfolioData = [
//   {
//     id: 1,
//     title: 'Mary Ann',
//     slug: 'mary-ann',
//     description: 'Session with Mary Ann, shot by Combina in February 2018',
//     model: 'Mary Ann',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=1',
//   },
//   {
//     id: 2,
//     title: 'Prints: Abstract',
//     slug: 'prints-abstract',
//     description: 'On Session production for portraits, shot by Combina in November 2016.',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=2',
//   },
//   {
//     id: 3,
//     title: 'Kansha: Love Bite',
//     slug: 'kansha-love-bite',
//     description: 'In Studio Production for Kansha Magazine, shot by Combina Key in August 2018.',
//     publication: 'Kansha',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=3',
//   },
//   {
//     id: 4,
//     title: 'Pump Magazine: Sharee',
//     slug: 'pump-magazine-sharee',
//     description: 'In Studio Production with Sharee Michelle for Pump Magazine, shot by Combina Key in November 2018.',
//     model: 'Sharee Michelle',
//     publication: 'Pump Magazine',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=4',
//   },
//   {
//     id: 5,
//     title: 'Elegant Magazine: Elena',
//     slug: 'elegant-magazine-elena',
//     description: 'In Studio Production with Elena for Elegant Magazine, shot by Combina Key in May 2019.',
//     model: 'Elena',
//     publication: 'Elegant Magazine',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=5',
//   },
//   {
//     id: 6,
//     title: 'Imirage Mag',
//     slug: 'imirage-mag',
//     description: 'In Studio Production for Imirage Magazine, shot by Combina Key in February 2019.',
//     publication: 'Imirage Mag',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=6',
//   },
//   {
//     id: 7,
//     title: 'Tamara Rzaeva',
//     slug: 'tamara-rzaeva',
//     description: 'Session with Tamara Rzaeva, shot by Combina Key on April 2018.',
//     model: 'Tamara Rzaeva',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=7',
//   },
//   {
//     id: 8,
//     title: 'Street Style: Karla Marie',
//     slug: 'street-style-karla-marie',
//     description: 'Street Style Session with Karla Marie, shot by Combina Key in December 2018.',
//     model: 'Karla Marie',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=8',
//   },
//   {
//     id: 9,
//     title: 'Shuba Magazine: Jyaira Moore',
//     slug: 'shuba-magazine-jyaira-moore',
//     description: 'A session with Jyaira Moore, shot by Combina in July 2018.',
//     model: 'Jyaira Moore',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=9',
//   },
//   {
//     id: 10,
//     title: 'Elena Tretyakova',
//     slug: 'elena-tretyakova',
//     description: 'Session with Elena Tretyakova, shot by Combina Key in March 2018.',
//     model: 'Elena Tretyakova',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=10',
//   },
//   {
//     id: 11,
//     title: 'Lissa DeLorenzo',
//     slug: 'lissa-delorenzo',
//     description: 'Session with Lissa DeLorenzo, shot by Combina Key in July 2018.',
//     model: 'Lissa DeLorenzo',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=11',
//     status: 'ACTIVE',
//   },
//   {
//     id: 12,
//     title: 'Lydia DTLA',
//     slug: 'lydia-dtl',
//     description: 'Session with Lydia, shot by Combina in DTLA in June 2024.',
//     model: 'Lydia',
//     dp: 'Combina Key',
//     projectLink: 'Link to project',
//     image: 'https://picsum.photos/300/200?random=12',
//     status: 'ACTIVE',
//   },
//   {
//     id: 13,
//     title: 'Wolf Media',
//     brand: 'test',
//     creation_10_images_services_provide: 'test',
//     days_location: 'Australia',
//     deliverables: '12 days',
//     location: 'Australia',
//     model: 'Ashley gardener',
//     name: 'wolf',
//     producer: 'Combina',
//     production_studio: 'Rocks',
//     sessions: 'yellow',
//     status: 'ACTIVE',
//     talent: 'Yes',
//     type: 'Creators',
//   },
// ];


// =====================================================
// static API
// export const getPortfolios = () => {
//   try {
//     const filteredData = portfolioData;
//     return { success: true, data: filteredData, totalPortfolios: filteredData.length };
//   } catch (error) {
//     toast.error(error.message);
//     return { success: false, error: error.message || 'An unknown error occurred' };
//   }
// };

// export const getPortfolioById = (id) => {
//   try {
//     const portfolio = portfolioData.filter((portfolio) => portfolio.id == id);
//     if (!portfolio) {
//       throw new Error('Portfolio not found');
//     }
//     return { success: true, data: portfolio };
//   } catch (error) {
//     toast.error(error.message);
//     return { success: false, error: error.message || 'An unknown error occurred' };
//   }
// };

// export const createPortfolio = (data) => {
//   try {
//     const newPortfolio = {
//       id: portfolioData.length + 1,
//       ...data,
//     };
//     portfolioData.push(newPortfolio);
//     toast.success('Portfolio created successfully!');
//     return { success: true, data: newPortfolio };
//   } catch (error) {
//     toast.error(error.message);
//     return { success: false, error: error.message || 'An unknown error occurred' };
//   }
// };

// export const updatePortfolio = (data) => {
//   try {
//     const portfolioIndex = portfolioData.findIndex((portfolio) => portfolio.id === data.id);
//     if (portfolioIndex === -1) throw new Error('Portfolio not found');

//     portfolioData[portfolioIndex] = { ...portfolioData[portfolioIndex], ...data };
//     toast.success('Portfolio updated successfully!');
//     return { success: true, data: portfolioData[portfolioIndex] };
//   } catch (error) {
//     toast.error(error.message);
//     return { success: false, error: error.message || 'An unknown error occurred' };
//   }
// };
