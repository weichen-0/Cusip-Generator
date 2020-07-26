from datetime import date
import re

class Ticker: 
    def __init__(self, name):
        self.name = name
        result = re.findall('^([A-Z]{2,3}|[A-Z]\s)([A-Z])([0-9]{1,2}) (Comdty|Index)$', name)[0]

        self.prefix = result[0]
        self.exp_month = result[1]
        self.exp_year = self.resolve_year(result[1], result[2])
        self.sector = result[3]
        
    def resolve_year(self, exp_month, exp_year):         # find the next immediate year ending in exp_year
        today = date.today()                             # tested with date(2017, 12, 1) 
        divisor = 10 if len(exp_year) == 1 else 100 
        month_map = {'F': 1,
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
                     'Z': 12}

        temp_year = int(today.year / divisor) * divisor + int(exp_year)
        temp_month = month_map[exp_month]          # assume exp_month provided by Bloomberg always exist in month_map
        if date(temp_year, temp_month, 31) < today:
            temp_year += divisor
        
        return str(temp_year)

    def check_digit(self, cusip):
        sum = 0
        for i in range(len(cusip)):
            ch = cusip[i]
            
            # assume that ch can only be digit/letter
            val = int(ch) if ch.isdigit() else ord(ch) - 55
            if (i + 1) % 2 == 0:
                val *= 2

            sum += int(val / 10) + val % 10
        return str((10 - sum % 10) % 10)

    def generate_cusip(self):
        size = len(self.prefix)
        cusip = self.prefix + self.exp_month

        if size == 1:
            cusip += self.exp_year[-1] + self.exp_year + self.exp_year[-1]
        elif size == 2:
            cusip += self.exp_year[-1] + self.exp_year
        else:
            cusip += self.exp_year[-1] + self.exp_year[:-1]
        
        return cusip + self.check_digit(cusip)
        