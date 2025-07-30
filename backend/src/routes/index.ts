import { Router } from 'express';
import { 
  getAllBodyTypes,
  getBodyTypeById,
  getBodyTypeWithListings,
  createBodyType,
  updateBodyType,
  deleteBodyType
} from '../controllers/bodyTypeController';

import { 
  getAllCarBrands,
  getCarBrandById,
  getCarBrandWithModels,
  getCarBrandWithListings,
  createCarBrand,
  updateCarBrand,
  deleteCarBrand
} from '../controllers/carBrandController';

import { 
  getAllCarModels,
  getCarModelById,
  getCarModelWithListings,
  createCarModel,
  updateCarModel,
  deleteCarModel
} from '../controllers/carModelController';

import { 
  getAllFuelTypes,
  getFuelTypeById,
  getFuelTypeWithListings,
  createFuelType,
  updateFuelType,
  deleteFuelType
} from '../controllers/fuelTypeController';

import { 
  getAllGearboxTypes,
  getGearboxTypeById,
  getGearboxTypeWithListings,
  createGearboxType,
  updateGearboxType,
  deleteGearboxType
} from '../controllers/gearboxTypeController';

import { 
  getAllListings,
  getListingById,
  getListingByExternalId,
  getRecentListings,
  getListingsStats,
  createListing,
  updateListing,
  deleteListing
} from '../controllers/listingController';

import { 
  getAllUsers,
  getUserById,
  getUserWithFavorites,
  getUserWithSearchFilters,
  createUser,
  updateUser,
  updateUserActivity,
  deleteUser
} from '../controllers/userController';

import { 
  getCombinedData,
  getReferenceData,
  searchListings
} from '../controllers/combinedController';

const router = Router();

router.get('/body-types', getAllBodyTypes);
router.get('/body-types/:id', getBodyTypeById);
router.get('/body-types/:id/listings', getBodyTypeWithListings);
router.post('/body-types', createBodyType);
router.put('/body-types/:id', updateBodyType);
router.delete('/body-types/:id', deleteBodyType);

router.get('/car-brands', getAllCarBrands);
router.get('/car-brands/:id', getCarBrandById);
router.get('/car-brands/:id/models', getCarBrandWithModels);
router.get('/car-brands/:id/listings', getCarBrandWithListings);
router.post('/car-brands', createCarBrand);
router.put('/car-brands/:id', updateCarBrand);
router.delete('/car-brands/:id', deleteCarBrand);

router.get('/car-models', getAllCarModels);
router.get('/car-models/:id', getCarModelById);
router.get('/car-models/:id/listings', getCarModelWithListings);
router.post('/car-models', createCarModel);
router.put('/car-models/:id', updateCarModel);
router.delete('/car-models/:id', deleteCarModel);

router.get('/fuel-types', getAllFuelTypes);
router.get('/fuel-types/:id', getFuelTypeById);
router.get('/fuel-types/:id/listings', getFuelTypeWithListings);
router.post('/fuel-types', createFuelType);
router.put('/fuel-types/:id', updateFuelType);
router.delete('/fuel-types/:id', deleteFuelType);

router.get('/gearbox-types', getAllGearboxTypes);
router.get('/gearbox-types/:id', getGearboxTypeById);
router.get('/gearbox-types/:id/listings', getGearboxTypeWithListings);
router.post('/gearbox-types', createGearboxType);
router.put('/gearbox-types/:id', updateGearboxType);
router.delete('/gearbox-types/:id', deleteGearboxType);

router.get('/listings', getAllListings);
router.get('/listings/recent', getRecentListings);
router.get('/listings/stats', getListingsStats);
router.get('/listings/:id', getListingById);
router.get('/listings/external/:externalId', getListingByExternalId);
router.post('/listings', createListing);
router.put('/listings/:id', updateListing);
router.delete('/listings/:id', deleteListing);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/users/:id/favorites', getUserWithFavorites);
router.get('/users/:id/search-filters', getUserWithSearchFilters);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.put('/users/:id/activity', updateUserActivity);
router.delete('/users/:id', deleteUser);

router.get('/combined/dashboard', getCombinedData);
router.get('/combined/reference', getReferenceData);
router.get('/combined/search', searchListings);

export default router;
