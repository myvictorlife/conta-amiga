
export interface Expense {
    idTravel: Travel;
    payingUser: string;
    title: string;
    description: string;
    usersParticipant: Array<UsersParticipant>;
    value: string;
}

export interface Travel {
    id: string;
    name: string;
}

export interface UsersParticipant {
    idUser: string;
    value: number;
}

export interface PersonNotPay {
    userId: string;
    name: string;
    value: number;
}
    