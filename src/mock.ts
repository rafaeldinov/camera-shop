import { commerce, database, datatype, internet, image, random, lorem } from 'faker';
import { Camera } from './types/camera';
import { CartItem } from './types/cart-item';
import { Promo } from './types/promo';
import { Review } from './types/review';
import { ReviewPost } from './types/review-post';

export const CAMERAS_COUNT = 40;
export const SIMILARS_ITEMS_COUNT = 9;
export const REVIEWS_COUNT = 10;
export const MAX_CART_ITEM_COUNT = 99;
export const FAKE_DISCOUNT_VALUE = 15;

const MIN_ID = 1;
const VENDOR_CODE_COUNT = 7;
const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;

export const makeFakeCamera = (): Camera => ({
  id: datatype.number({ min: MIN_ID }),
  name: lorem.word(),
  vendorCode: random.alphaNumeric(VENDOR_CODE_COUNT),
  type: database.type(),
  category: lorem.word(),
  description: commerce.productDescription(),
  level: lorem.word(),
  rating: datatype.number({ min: MIN_RATING, max: MAX_RATING }),
  price: datatype.number({ min: MIN_PRICE, max: MAX_PRICE }),
  previewImg: image.image(),
  previewImg2x: image.image(),
  previewImgWebp: image.image(),
  previewImgWebp2x: image.image(),
  reviewCount: REVIEWS_COUNT
} as Camera);

export const makeFakeSendReview = (): ReviewPost => ({
  cameraId: datatype.number({ min: 0, max: CAMERAS_COUNT }),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(300, 50),
  rating: datatype.number({ min: 0, max: MAX_RATING }),
} as ReviewPost);

export const makeFakeReview = (): Review => ({
  id: lorem.sentence(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(300, 50),
  rating: datatype.number({ min: 0, max: MAX_RATING }),
  createAt: datatype.datetime.toString(),
  cameraId: datatype.number({ min: MIN_ID }),
} as Review);

export const makeFakePromo = (): Promo => ({
  id: datatype.number({ min: MIN_ID }),
  name: lorem.word(),
  previewImg: image.image(),
  previewImg2x: image.image(),
  previewImgWebp: image.image(),
  previewImgWebp2x: image.image()
} as Promo);

export const makeFakeCartItem = (): CartItem => ({
  id: datatype.number({ min: MIN_ID }),
  name: lorem.word(),
  vendorCode: random.alphaNumeric(VENDOR_CODE_COUNT),
  type: database.type(),
  category: lorem.word(),
  description: commerce.productDescription(),
  level: lorem.word(),
  rating: datatype.number({ min: MIN_RATING, max: MAX_RATING }),
  price: datatype.number({ min: MIN_PRICE, max: MAX_PRICE }),
  previewImg: image.image(),
  previewImg2x: image.image(),
  previewImgWebp: image.image(),
  previewImgWebp2x: image.image(),
  reviewCount: REVIEWS_COUNT,
  quantity: MAX_CART_ITEM_COUNT,
} as CartItem);

export const makeFakeCameras = (quantity: number): Camera[] => (
  new Array(quantity).fill(null).map(makeFakeCamera) as Camera[]);

export const makeFakeCartItems = (quantity: number): CartItem[] => (
  new Array(quantity).fill(null).map(makeFakeCamera) as CartItem[]);

export const makeFakeReviews = (quantity: number): Review[] => (
  new Array(quantity).fill(null).map(makeFakeReview) as Review[]);

export const FAKE_COUPON = 'camera-333';
export const FAKE_DISCOUNT = 15;
