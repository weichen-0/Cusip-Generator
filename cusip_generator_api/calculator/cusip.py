import re
from cusip_generator_api.model.futures_expiry_month import FuturesExpiryMonth
from cusip_generator_api.calculator import util


def calculate_cusip(ticker_name):
    prefix, month_code, truncated_year, _ = re.findall(r'^([A-Z]{1,3})\s?([A-Z])([0-9]{1,2}) (Comdty|Index)$',
                                                       ticker_name)[0]
    expiry_month = FuturesExpiryMonth.from_code(month_code)
    expiry_year = util.calculate_expiry_year(expiry_month, truncated_year)
    cusip = prefix + month_code + expiry_year[-1] + expiry_year

    if len(prefix) == 1:
        cusip += expiry_year[-1]
    elif len(prefix) == 3:
        cusip = cusip[:-1]

    return util.append_check_digit(cusip)
