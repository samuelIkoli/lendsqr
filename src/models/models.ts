export interface transaction_object {
    id: String;
    user_id: String;
    transaction_type: String;
    amount: Number
}

export interface transfer_object {
    id: String;
    sender_id: String;
    receiver_id: String;
    amount: Number
}

export interface user_object {
    id: String;
    email: String;
    password: String;
    wallet: Number
};