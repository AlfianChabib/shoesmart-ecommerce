'use client';

import { useSearchParams } from 'next/navigation';
import ValidateOTPForm from './validate-otp-form';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  return uid ? (
    <ValidateOTPForm userId={uid} />
  ) : (
    <div>
      <div>
        <h1>tes</h1>
      </div>
    </div>
  );
}
