from cusip_generator_api.calculator.cusip import calculate_cusip
from cusip_generator_api.model.generator_response import GeneratorResponse, GeneratorResponses
from cusip_generator_api.ticker_validator import validate


def get_cusip(ticker):
    try:
        validate(ticker)
        return GeneratorResponse(success=True, result=calculate_cusip(ticker))
    except ValueError as error:
        return GeneratorResponse(success=False, error=str(error))


def get_cusips(tickers):
    return GeneratorResponses([get_cusip(ticker) for ticker in tickers])
