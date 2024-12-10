import { IsEmail, Matches } from 'class-validator';
import { IsDateString } from 'class-validator';

export class UpdateDTO {
  // @IsEmail()
  email: string;

  dia_chi: string;

  // @Matches(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/, {
  //   message: 'Phone number is not valid',
  // })
  sdt: string;

  // @Matches(/^[0-9]{12}$/, {
  //   message: 'Identity number incorrect',
  // })
  cccd: string;

  @IsDateString({}, { message: 'Birthday must be a valid date' })
  ngay_sinh: string;
}
