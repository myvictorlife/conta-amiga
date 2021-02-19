
export interface Expense {
    travel: Travel;
    title: string;
    description: string;
    person_to_pay: Array<PersonToPay>;
    person_not_pay: Array<PersonNotPay>;
    split_to_everyone: boolean;
    total: number;
    date: Date;
}

export interface Travel {
    id: string;
    name: string;
}

export interface PersonToPay {
    userId: string;
    name: string;
    value: number;
    payment_type: string;
}

export interface PersonNotPay {
    userId: string;
    name: string;
    value: number;
}
    