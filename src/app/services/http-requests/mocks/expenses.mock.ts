const expenses = {
    data: {
        user: {
            name: "Victor César",
            email: "victorcmggg@gmail.com",
            phone: "34984233377",
            is_phone_valid: true,
        },
        travels: [
            {
                id: 1,
                title: "Floripa",
                description: "Best trip",
                start_date: "2020-02-20",
                end_date: "2020-02-7",
	            users: [{
                       id: 1,
                       nome: "Victor César"
                }]
            },
            {
                id: 2,
                title: "Ilha Bela",
                description: "Nice trip",
                start_date: "2020-01-28",
                end_date: "2020-01-30",
	            users: [{
                       id: 1,
                       nome: "Victor César"
                }]
            }
        ]
    }
};
export default expenses;