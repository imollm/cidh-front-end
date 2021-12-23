module.exports = () => {
    const { Client } = require('pg')

    const client = new Client({
        user: 'root',
        host: '82.223.111.102',
        database: 'postgres',
        password: 'Pass2021!',
        port: 6432
    })

    const queries = {
        category: [
            {
                text: "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4a', 'Category 1', 'Description 1', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4b', 'Category 2', 'Description 2', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4c', 'Category 3', 'Description 3', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4d', 'Category 4', 'Description 4', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4e', 'Category 5', 'Description 5', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4f', 'Category 6', 'Description 6', '2021-03-31 09:30:20-07']
            }
        ],
        label: [
            {
                text: "INSERT INTO label (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4a', 'Label 1', 'Description 1', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO label (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4b', 'Label 2', 'Description 2', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO label (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4c', 'Label 3', 'Description 3', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO label (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4d', 'Label 4', 'Description 4', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO label (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4e', 'Label 5', 'Description 5', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO label (id, name, description, created_at) VALUES ($1, $2, $3, $4)",
                values: ['d5a8fae9-d376-4e37-a5b0-46f9128beb4f', 'Label 6', 'Description 6', '2021-03-31 09:30:20-07']
            }
        ],
        user: [
            {
                text: "INSERT INTO user (id, first_name, last_name, fiscal_id, address, email, email_token, is_valid_email, preferred_language, password, deleted_at, created_at) VALUES ($1, $2, $3)",
                values: ['d578fae9-d222-4o37-a5b0-46f9128beb4f', 'SuperAdmin', 'SuperAdmin', 'NOTVALIDATED', 'Some address', 'superadmin@indahou.se', null, true, 'English', '$2a$12$cYd7Izho3U1SdKloTKY83e0QUYZS9dAcVlW45CdjkYr1EHFPH.ymK', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO user_role (id, user, role) VALUES ($1, $2, $3);",
                values: ['d5864ae9-d386-4o37-a5b0-46f9120beb4f', 'd578fae9-d222-4o37-a5b0-46f9128beb4f', 'SUPERADMIN']
            },
            {
                text: "INSERT INTO user (id, first_name, last_name, fiscal_id, address, email, email_token, is_valid_email, preferred_language, password, deleted_at, created_at) VALUES ($1, $2, $3)",
                values: ['d578fae9-d376-4o37-a5b0-46f9128beb4f', 'Admin', 'Admin', 'NOTVALIDATED', 'Some address', 'admin@indahou.se', null, true, 'English', '$2a$12$HbyTXCCqe6g40P58rnmwAerxkxHS2yyIAhFF2FNMgCD1WYY9trGH2', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO user_role (id, user, role) VALUES ($1, $2, $3);",
                values: ['d578fae9-d386-4o37-a5b0-46f9120beb4f', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', 'ADMIN']
            }
        ],
        eventOrganizer: [
            {
                text: "INSERT INTO event_organizer (id, name, description, admin, created_at) VALUES ($1, $2, $3, $4, $5)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb4f', 'Event organizer 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO event_organizer (id, name, description, admin, created_at) VALUES ($1, $2, $3, $4, $5)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb41', 'Event organizer 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO event_organizer (id, name, description, admin, created_at) VALUES ($1, $2, $3, $4, $5)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb42', 'Event organizer 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO event_organizer (id, name, description, admin, created_at) VALUES ($1, $2, $3, $4, $5)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb43', 'Event organizer 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO event_organizer (id, name, description, admin, created_at) VALUES ($1, $2, $3, $4, $5)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb44', 'Event organizer 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', '2021-03-31 09:30:20-07']
            },
            {
                text: "INSERT INTO event_organizer (id, name, description, admin, created_at) VALUES ($1, $2, $3, $4, $5)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb45', 'Event organizer 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'd578fae9-d376-4o37-a5b0-46f9128beb4f', '2021-03-31 09:30:20-07']
            }
        ],
        event: [
            {
                text: "INSERT INTO event (id, name, description, header_image, start_date, end_date, organizer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb40', 'Event 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07', 'd578fae9-d376-4e37-a5b0-46f9128beb4f', 'd5a8fae9-d376-4e37-a5b0-46f9128beb4a']
            },
            {
                text: "INSERT INTO event (id, name, description, header_image, start_date, end_date, organizer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb41', 'Event 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07', 'd578fae9-d376-4e37-a5b0-46f9128beb41', 'd5a8fae9-d376-4e37-a5b0-46f9128beb4b']
            },
            {
                text: "INSERT INTO event (id, name, description, header_image, start_date, end_date, organizer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb42', 'Event 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07', 'd578fae9-d376-4e37-a5b0-46f9128beb42', 'd5a8fae9-d376-4e37-a5b0-46f9128beb4c']
            },
            {
                text: "INSERT INTO event (id, name, description, header_image, start_date, end_date, organizer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb43', 'Event 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07', 'd578fae9-d376-4e37-a5b0-46f9128beb43', 'd5a8fae9-d376-4e37-a5b0-46f9128beb4d']
            },
            {
                text: "INSERT INTO event (id, name, description, header_image, start_date, end_date, organizer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb44', 'Event 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07', 'd578fae9-d376-4e37-a5b0-46f9128beb44', 'd5a8fae9-d376-4e37-a5b0-46f9128beb4e']
            },
            {
                text: "INSERT INTO event (id, name, description, header_image, start_date, end_date, organizer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb45', 'Event 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque sed sapien nec efficitur. Integer aliquet vehicula justo non tempus.', 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg', '2021-03-31 09:30:20-07', '2021-03-31 09:30:20-07', 'd578fae9-d376-4e37-a5b0-46f9128beb45', 'd5a8fae9-d376-4e37-a5b0-46f9128beb4f']
            },
        ],
        labelEvent: [
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb40', 'Label 1']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb40', 'Label 2']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb41', 'Label 3']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb41', 'Label 4']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb42', 'Label 5']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb42', 'Label 6']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb43', 'Label 1']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb43', 'Label 2']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb44', 'Label 3']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb44', 'Label 4']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb45', 'Label 5']
            },
            {
                text: "INSERT INTO label_event (event_id, label_name) VALUES ($1, $2)",
                values: ['d578fae9-d376-4e37-a5b0-46f9128beb45', 'Label 6']
            }
        ]
    }

    await client.connect()

    Object.keys(queries).every(resource => {
        resource.forEach(query => {
            client
                .query(query)
                .then(res => console.log(res.rows[0]))
                .catch(e => console.error(e.stack))
        });
    })

    return null
}
