from .invalid_ticker_error import InvalidTickerError


class FuturesExpiryMonth:

    _map = {
        'F': 1,
        'G': 2,
        'H': 3,
        'J': 4,
        'K': 5,
        'M': 6,
        'N': 7,
        'Q': 8,
        'U': 9,
        'V': 10,
        'X': 11,
        'Z': 12
    }

    @classmethod
    def from_code(cls, code):
        if code not in cls._map:
            raise ValueError(InvalidTickerError.EXPIRY_MONTH.value)
        return cls._map[code]
