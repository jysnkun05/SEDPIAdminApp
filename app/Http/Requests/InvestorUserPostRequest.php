<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\Account;

class InvestorUserPostRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $account = Account::findOrFail(Request::get('id'));
        return [
            'username' => 'unique:investor_users,username,'.$account->investorUser->id,
            'newPassword' => 'same:repeatNewPassword'
        ];
    }
    
}
