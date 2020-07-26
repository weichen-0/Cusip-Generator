import enum


class InvalidTickerError(enum.Enum):
    MALFORMED = "Ticker is malformed, and should contain a prefix, expiry month code, expiry year and sector, " \
                "e.g. LAZ18 Comdty. "
    SECTOR = "Sector must be Index or Comdty."
    PREFIX_TOO_SHORT = "Prefix must have minimum of length 2. Please append a space for ticker prefix of length 1."
    PREFIX = "Invalid ticker prefix. It must have 1 to 3 uppercase letters."
    EXPIRY_MONTH = "Invalid expiration month code. It must be uppercase and one of F,G,H,J,K,M,N,Q,U,V,X,Z."
    EXPIRY_YEAR = "Invalid expiration year. It must contain 1 or 2 numerics, for e.g., 7 or 17."
