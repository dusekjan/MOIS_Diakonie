from http import HTTPStatus
from typing import Optional, Union


STATUSES = {
    "ok": HTTPStatus.OK,
    "created": HTTPStatus.CREATED,
    "bad_request": HTTPStatus.BAD_REQUEST,
    "unauthorized": HTTPStatus.UNAUTHORIZED,
    "conflict": HTTPStatus.CONFLICT,
    "forbidden": HTTPStatus.FORBIDDEN
}


def json_response(request_status: str, data: Optional[Union[dict, list]] = None,
                  message: Optional[str] = None, json_status: Optional[int] = None) -> tuple:
    """
    Response JSON object always in ({"message": X, "json_status": Y}, status) format.
    Optionally is possible append key "data".
    """
    status = STATUSES[request_status]
    result = {"message": message if message else status.phrase, "json_status": json_status or status.value}
    if data is not None:
        result.update(data=data)
        print(data, flush=True)

    return result, status.value
