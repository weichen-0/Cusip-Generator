from datetime import date
from cusip_generator_api.model.clock import get_today_date


# Given expiry month (int) and 1 or 2-digit year, find the next immediate year that ending in exp_year
def calculate_expiry_year(expiry_month, truncated_year):
    today = get_today_date()
    divisor = 10 if len(truncated_year) == 1 else 100

    temp_year = int(today.year / divisor) * divisor + int(truncated_year)
    if date(temp_year, expiry_month, 1) <= date(today.year, today.month, 1):
        temp_year += divisor

    return str(temp_year)


# Given 8-digit cusip result, append check digit
def append_check_digit(cusip):
    count = 0
    for i in range(len(cusip)):
        ch = cusip[i]

        # ch can only be digit or letter
        val = int(ch) if ch.isdigit() else ord(ch) - 55
        if (i + 1) % 2 == 0:
            val *= 2

        count += int(val / 10) + val % 10
    return cusip + str((10 - count % 10) % 10)


