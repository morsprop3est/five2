import { Router } from 'express';
import {
  getAllListings, getListingById, createListing, updateListing, deleteListing
} from '../controllers/listingController';
import {
  getAllUsers, getUserById, createUser, updateUser, deleteUser
} from '../controllers/userController';
import {
  getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile
} from '../controllers/userProfileController';
import {
  getAllUserSearchFilters, getUserSearchFilterById, createUserSearchFilter, updateUserSearchFilter, deleteUserSearchFilter
} from '../controllers/userSearchFilterController';
import { getAllCarBrands, getCarBrandById } from '../controllers/carBrandController';
import { getAllCarModels, getCarModelById } from '../controllers/carModelController';
import { getAllCarTypes, getCarTypeById } from '../controllers/carTypeController';
import { getAllFuelTypes, getFuelTypeById } from '../controllers/fuelTypeController';
import { getAllGearboxTypes, getGearboxTypeById } from '../controllers/gearboxTypeController';
import {
  getAllNotificationQueues, getNotificationQueueById, createNotificationQueue, updateNotificationQueue, deleteNotificationQueue
} from '../controllers/notificationQueueController';

const router = Router();

router.get('/listings', getAllListings);
router.get('/listings/:id', getListingById);
router.post('/listings', createListing);
router.put('/listings/:id', updateListing);
router.delete('/listings/:id', deleteListing);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/user-profiles', getAllProfiles);
router.get('/user-profiles/:id', getProfileById);
router.post('/user-profiles', createProfile);
router.put('/user-profiles/:id', updateProfile);
router.delete('/user-profiles/:id', deleteProfile);

router.get('/user-search-filters', getAllUserSearchFilters);
router.get('/user-search-filters/:id', getUserSearchFilterById);
router.post('/user-search-filters', createUserSearchFilter);
router.put('/user-search-filters/:id', updateUserSearchFilter);
router.delete('/user-search-filters/:id', deleteUserSearchFilter);

router.get('/car-brands', getAllCarBrands);
router.get('/car-brands/:id', getCarBrandById);

router.get('/car-models', getAllCarModels);
router.get('/car-models/:id', getCarModelById);

router.get('/car-types', getAllCarTypes);
router.get('/car-types/:id', getCarTypeById);

router.get('/fuel-types', getAllFuelTypes);
router.get('/fuel-types/:id', getFuelTypeById);

router.get('/gearbox-types', getAllGearboxTypes);
router.get('/gearbox-types/:id', getGearboxTypeById);

router.get('/notification-queue', getAllNotificationQueues);
router.get('/notification-queue/:id', getNotificationQueueById);
router.post('/notification-queue', createNotificationQueue);
router.put('/notification-queue/:id', updateNotificationQueue);
router.delete('/notification-queue/:id', deleteNotificationQueue);

export default router; 