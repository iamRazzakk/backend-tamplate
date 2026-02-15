import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";
import mongoose from "mongoose";
import { responseMessage } from "../../constant/response.message";

const createBannerToDB = async (payload: IBanner): Promise<IBanner> => {
  const createBanner: any = await Banner.create(payload);
  if (!createBanner) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Banner ${responseMessage.FAILED_TO_CREATE}`
    );
  }
  return createBanner;
};

const getAllBannerFromDB = async (): Promise<IBanner[]> => {
  return await Banner.find({});
};

const updateBannerToDB = async (
  id: string,
  payload: IBanner
): Promise<IBanner | {}> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      `${responseMessage.INVALID_ID}`
    );
  }

  const isBannerExist: any = await Banner.findById(id);
  if (!isBannerExist) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Banner ${responseMessage.NOT_FOUND}`
    );
  }

  const banner: any = await Banner.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return banner;
};

const deleteBannerToDB = async (id: string): Promise<IBanner | undefined> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Invalid ");
  }
  const isBannerExist: any = await Banner.findById(id);
  if (!isBannerExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");
  }
  //delete from database
  await Banner.findByIdAndDelete(id);
  return;
};

export const BannerService = {
  createBannerToDB,
  getAllBannerFromDB,
  updateBannerToDB,
  deleteBannerToDB,
};
