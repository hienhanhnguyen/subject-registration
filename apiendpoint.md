# API Documentation

## Endpoint: `GET /api/v1/auth/login`

- **Description**: Login
- **Response**:
  - **200 OK**: Returns an array of resources.
  - **400 Bad Request**: Invalid request parameters.

## Endpoint: `GET /api/resource/{id}`

- **Description**: Retrieve a single resource by ID.
- **Parameters**:
  - **id** (string): The ID of the resource.
- **Response**:
  - **200 OK**: Returns the requested resource.
  - **404 Not Found**: Resource not found.

## Endpoint: `POST /api/resource`

- **Description**: Create a new resource.
- **Body**:
  - **name** (string): Name of the resource.
  - **value** (number): Value of the resource.
- **Response**:
  - **201 Created**: Resource created successfully.
  - **400 Bad Request**: Invalid request body.

## Endpoint: `PUT /api/resource/{id}`

- **Description**: Update an existing resource.
- **Parameters**:
  - **id** (string): The ID of the resource.
- **Body**:
  - **name** (string, optional): Updated name.
  - **value** (number, optional): Updated value.
- **Response**:
  - **200 OK**: Resource updated successfully.
  - **400 Bad Request**: Invalid request body.
  - **404 Not Found**: Resource not found.

## Endpoint: `DELETE /api/resource/{id}`

- **Description**: Delete a resource by ID.
- **Parameters**:
  - **id** (string): The ID of the resource.
- **Response**:
  - **200 OK**: Resource deleted successfully.
  - **404 Not Found**: Resource not found.
