// hard coded state to test things before hooking up a database:

const state = {
    // markers to generate on a map
    markers: [
        {
            title:'Asdf', 
            name: 'Coolio', 
            position: {lat:30.2672, lng: -97.7431}
        },
        {
            title: 'Dfsa',
            name: 'Jerome', 
            position: {lat:30.2670, lng: -97.7428}
        },
        {
            title: 'Fdas', 
            name: 'Clinton',
            position: {lat:30.2666, lng: -97.7421}
        }
    ],

    // coordinates to use for centering map, generated from navigator.geolocation
    centerCoords: {},

    // users array:
    users: [
        {
            id: 1,
            username: 't28fan',
            password: 'password12345',
            aircraft: [
                {
                    model: 'T28',
                    description: 'The Everyday Warbird',
                    windMin: 0,
                    windMax: 15
                },
                {
                    model: 'P47',
                    description: 'The Jug',
                    windMin: 5,
                    windMax: 20
                }
            ],
            markers: [
                {
                    title:'Asdf', 
                    name: 'Coolio', 
                    position: {lat:30.2672, lng: -97.7431}
                },
                {
                    title: 'Dfsa',
                    name: 'Jerome', 
                    position: {lat:30.2670, lng: -97.7428}
                },
                {
                    title: 'Fdas', 
                    name: 'Clinton',
                    position: {lat:30.2666, lng: -97.7421}
                }
            ]
        },
        {
            id: 2,
            username: 'joshbixler',
            password: 'flitetest',
            aircraft: [
                {
                    model: 'Bix3',
                    description: 'A dream to fly',
                    windMin: 0,
                    windMax: 30
                }
            ],
            markers: [
                {
                    title:'Asdf', 
                    name: 'Coolio', 
                    position: {lat:30.2672, lng: -97.7431}
                },
                {
                    title: 'Dfsa',
                    name: 'Jerome', 
                    position: {lat:30.2670, lng: -97.7428}
                },
                {
                    title: 'Fdas', 
                    name: 'Clinton',
                    position: {lat:30.2666, lng: -97.7421}
                }
            ]
        }
    ]
}

export default state;