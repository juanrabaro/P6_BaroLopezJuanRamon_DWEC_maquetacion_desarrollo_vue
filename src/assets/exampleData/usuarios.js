export const exampleDataUsuarios =
{
  "data": [
    {
      "id": 1,
      "nombreUsuario": "pepe",
      "email": "pepe@gmail.com",
      "password": "pepe",
      "ciudadesGuardadas": [
        {
          "id": 1,
          "idCiudad": 1,
          "idUsuario": 1
        },
        {
          "id": 5,
          "idCiudad": 4,
          "idUsuario": 1
        }
      ]
    },
    {
      "id": 2,
      "nombreUsuario": "pepe2",
      "email": "pepe2@gmail.com",
      "password": "$2y$12$WI5AXnC9vecHJW1n9ts4wOC/x1jDD9V24114f3/0XdlfNFUc3Cdl6",
      "ciudadesGuardadas": [
        {
          "id": 2,
          "idCiudad": 10,
          "idUsuario": 2
        }
      ]
    },
    {
      "id": 3,
      "nombreUsuario": "juan",
      "email": "juan@gmail.com",
      "password": "$2y$12$MMgcJmo4cKq/2dTrCYoRfOR.HdXr3re5AXry8vhYNni.JeXXQ5lhi",
      "ciudadesGuardadas": []
    },
    {
      "id": 5,
      "nombreUsuario": "juan2",
      "email": "juan2@gmail.com",
      "password": "$2y$12$o6JlRiCjzNrGvS779hepnOby73fD2u8j2MeBUwHWHJGQsVdeiY3ey",
      "ciudadesGuardadas": []
    },
    {
      "id": 8,
      "nombreUsuario": "juan",
      "email": "juan3@gmail.com",
      "password": "$2y$12$1fZY5GHua2PvRMhdXqGiQuzDaofmdz86VS80zEXUv2AdQP1PgK6Aa",
      "ciudadesGuardadas": []
    },
    {
      "id": 10,
      "nombreUsuario": "juan",
      "email": "juan4@gmail.com",
      "password": "$2y$12$xwQOGK6tKM00HDiBrF1KfekV7MSU0YLowsMo71bBechS.0AsDzFYy",
      "ciudadesGuardadas": []
    },
    {
      "id": 12,
      "nombreUsuario": "juan",
      "email": "juan5@gmail.com",
      "password": "$2y$12$3SdOoRXE849DLB82qp1zHurj.Q6jKD0WjR4tAVV3wbB7l9ewCZoKq",
      "ciudadesGuardadas": []
    },
    {
      "id": 13,
      "nombreUsuario": "antonio",
      "email": "antonio@gmail.com",
      "password": "$2y$12$rM/3cnmAh2SklLfacV4Jj.BKu3q6GO5bjjn4JOaJ1.y2yC7b6mnAW",
      "ciudadesGuardadas": [
        {
          "id": 3,
          "idCiudad": 1,
          "idUsuario": 13
        },
        {
          "id": 4,
          "idCiudad": 2,
          "idUsuario": 13
        }
      ]
    }
  ],
  "links": {
    "first": "http://localhost/api/usuarios?page=1",
    "last": "http://localhost/api/usuarios?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://localhost/api/usuarios?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "http://localhost/api/usuarios",
    "per_page": 10,
    "to": 8,
    "total": 8
  }
}