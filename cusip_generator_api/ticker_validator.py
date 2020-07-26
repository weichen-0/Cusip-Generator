import re
from cusip_generator_api.model.invalid_ticker_error import InvalidTickerError
from cusip_generator_api.model.futures_expiry_month import FuturesExpiryMonth


def validate_sector(sector):
    if sector not in ["Index", "Comdty"]:
        raise ValueError(InvalidTickerError.SECTOR.value)


def validate_prefix(prefix):
    if len(prefix) < 2:
        raise ValueError(InvalidTickerError.PREFIX_TOO_SHORT.value)
    elif not re.findall(r'^([A-Z]{1,3})$', prefix):
        raise ValueError(InvalidTickerError.PREFIX.value)


def validate_expiry_month_code(month_code):
    FuturesExpiryMonth().from_code(month_code)


def validate_expiry_year(year):
    if not re.findall(r'^([0-9]{1,2})$', year):
        raise ValueError(InvalidTickerError.EXPIRY_YEAR.value)


def validate_structure(ticker):
    result = re.findall(r'^([a-zA-Z0-9]*\s?)([A-Z])([a-zA-Z0-9]*) ([a-zA-Z]*)$', ticker)
    if len(result) == 0:
        raise ValueError(InvalidTickerError.MALFORMED.value)

    prefix, month_code, year, sector = result[0]
    return prefix, month_code, year, sector


def validate(ticker):
    try:
        prefix, month_code, year, sector = validate_structure(ticker)
        validate_sector(sector)
        validate_prefix(prefix)
        FuturesExpiryMonth().from_code(month_code)
        validate_expiry_year(year)
    except ValueError as error:
        raise ValueError("%s - %s" % (ticker, error))
    return True
