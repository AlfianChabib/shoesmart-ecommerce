import otpGenerator from 'otp-generator';
import dayjs, { ManipulateType } from 'dayjs';
import { prisma } from '../app/prisma';

export const generateOTP = (expire: number, expireUnit: ManipulateType) => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    digits: true,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const expires = dayjs().add(expire, expireUnit).toDate();

  return { OTP, expires };
};

export const validateOtp = async (otp: string) => {
  const checkOtp = await prisma.otp.findUnique({
    where: { code: otp },
  });

  if (!checkOtp) return false;
  return true;
};
