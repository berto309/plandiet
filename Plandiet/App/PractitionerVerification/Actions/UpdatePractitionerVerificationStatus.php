<?php

namespace Plandiet\App\PractitionerVerification\Actions;

use App\Mail\PractitionerVerificationApprovedMail;
use App\Mail\PractitionerVerificationRejectedMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\Infrastructure\Enums\UserStatusEnum;

final class UpdatePractitionerVerificationStatus
{
    public function update(int $id, array $data): void
    {
        $verificationData = [
            'verification_status' => $data['verification_status'],
            'suspension_reason' =>  $this->statusIsVerified($data) ? null : $data['suspension_reason'],
            'rejection_reason' => $this->statusIsVerified($data) ? null : $data['rejection_reason'],
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ];


        $practitioner = User::where('id', $id)->firstOr(fn () => abort(code: 404, message: 'Practitioner account not found.'));

        if($practitioner->status->isNotActive())
        {
            $practitioner->update(['status' => UserStatusEnum::ACTIVE]);
        }

        PractitionerProfile::where('user_id', $id)->update($verificationData);


        match(true){
            $this->statusIsVerified($data) =>  Mail::to($practitioner->email)->send(new PractitionerVerificationApprovedMail($practitioner->name)),
            default =>  Mail::to($practitioner->email)->send(new PractitionerVerificationRejectedMail($practitioner->name, $data['rejection_reason']))
        };
    }

    public function statusIsVerified(array $data): bool
    {
        return $data['verification_status'] === VerificationStatusEnum::VERIFIED->value;
    }

    public function statusIsRejected(array $data): bool
    {
        return $data['verification_status'] === VerificationStatusEnum::REJECTED->value;
    }


}
