"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listingController_1 = require("../controllers/listingController");
const userController_1 = require("../controllers/userController");
const userProfileController_1 = require("../controllers/userProfileController");
const userSearchFilterController_1 = require("../controllers/userSearchFilterController");
const carBrandController_1 = require("../controllers/carBrandController");
const carModelController_1 = require("../controllers/carModelController");
const carTypeController_1 = require("../controllers/carTypeController");
const fuelTypeController_1 = require("../controllers/fuelTypeController");
const gearboxTypeController_1 = require("../controllers/gearboxTypeController");
const notificationQueueController_1 = require("../controllers/notificationQueueController");
const router = (0, express_1.Router)();
router.get('/listings', listingController_1.getAllListings);
router.get('/listings/:id', listingController_1.getListingById);
router.post('/listings', listingController_1.createListing);
router.put('/listings/:id', listingController_1.updateListing);
router.delete('/listings/:id', listingController_1.deleteListing);
router.get('/users', userController_1.getAllUsers);
router.get('/users/:id', userController_1.getUserById);
router.post('/users', userController_1.createUser);
router.put('/users/:id', userController_1.updateUser);
router.delete('/users/:id', userController_1.deleteUser);
router.get('/user-profiles', userProfileController_1.getAllProfiles);
router.get('/user-profiles/:id', userProfileController_1.getProfileById);
router.post('/user-profiles', userProfileController_1.createProfile);
router.put('/user-profiles/:id', userProfileController_1.updateProfile);
router.delete('/user-profiles/:id', userProfileController_1.deleteProfile);
router.get('/user-search-filters', userSearchFilterController_1.getAllUserSearchFilters);
router.get('/user-search-filters/:id', userSearchFilterController_1.getUserSearchFilterById);
router.post('/user-search-filters', userSearchFilterController_1.createUserSearchFilter);
router.put('/user-search-filters/:id', userSearchFilterController_1.updateUserSearchFilter);
router.delete('/user-search-filters/:id', userSearchFilterController_1.deleteUserSearchFilter);
router.get('/car-brands', carBrandController_1.getAllCarBrands);
router.get('/car-brands/:id', carBrandController_1.getCarBrandById);
router.get('/car-models', carModelController_1.getAllCarModels);
router.get('/car-models/:id', carModelController_1.getCarModelById);
router.get('/car-types', carTypeController_1.getAllCarTypes);
router.get('/car-types/:id', carTypeController_1.getCarTypeById);
router.get('/fuel-types', fuelTypeController_1.getAllFuelTypes);
router.get('/fuel-types/:id', fuelTypeController_1.getFuelTypeById);
router.get('/gearbox-types', gearboxTypeController_1.getAllGearboxTypes);
router.get('/gearbox-types/:id', gearboxTypeController_1.getGearboxTypeById);
router.get('/notification-queue', notificationQueueController_1.getAllNotificationQueues);
router.get('/notification-queue/:id', notificationQueueController_1.getNotificationQueueById);
router.post('/notification-queue', notificationQueueController_1.createNotificationQueue);
router.put('/notification-queue/:id', notificationQueueController_1.updateNotificationQueue);
router.delete('/notification-queue/:id', notificationQueueController_1.deleteNotificationQueue);
exports.default = router;
