import express from 'express';
import authMiddleware from '../services/auth-middleware.js';
import{Create} from '../controllers/order/create.js';
import{Get} from '../controllers/order/get.js';
import{Update} from '../controllers/order/update.js';

const router = express.Router();

this.router.get('/order/notification/:userTo',authMiddleware.verifyUser, Get.prototype.notifications);
this.router.get('/order/:orderId',authMiddleware.verifyUser, Get.prototype.orderId);
this.router.get('/order/seller/:sellerId',authMiddleware.verifyUser, Get.prototype.sellerOrders);
this.router.get('/order/buyer/:buyerId',authMiddleware.verifyUser, Get.prototype.buyerOrders);
this.router.post('/order',authMiddleware.verifyUser, Create.prototype.order);
this.router.post('/order/create-payment-intent',authMiddleware.verifyUser, Create.prototype.intent);
this.router.put('/order/cancel/:orderId',authMiddleware.verifyUser, Update.prototype.cancel);
this.router.put('/order/extension/:orderId',authMiddleware.verifyUser, Update.prototype.requestExtension);
this.router.put('/order/deliver-order/:orderId',authMiddleware.verifyUser, Update.prototype.deliverOrder);
this.router.put('/order/approve-order/:orderId',authMiddleware.verifyUser, Update.prototype.approveOrder);
this.router.put('/order/gig/:type/:orderId',authMiddleware.verifyUser, Update.prototype.deliveryDate);
this.router.put('/order/notification/mark-as-read',authMiddleware.verifyUser, Update.prototype.markNotificationAsRead);



export default router;
