class GeneratorResponse:
    def __init__(self, success, result=None, error=None):
        super().__setattr__("success", success)
        super().__setattr__("result", result)
        super().__setattr__("error", error)

    def __setattr__(self, name, value):  # Object is immutable
        msg = "'%s' has no attribute %s" % (self.__class__, name)
        raise AttributeError(msg)


class GeneratorResponses:
    def __init__(self, generator_response_list):

        # compile results and/or errors into a unified multi-cusip response
        results = [None] * len(generator_response_list)
        errors = []
        for idx in range(len(generator_response_list)):
            response = generator_response_list[idx]
            if not response.success:
                errors.append(str(response.error))
            elif len(errors) == 0:
                results[idx] = response.result

        success = len(errors) == 0
        super().__setattr__("success", success)
        super().__setattr__("results", results if success else None)
        super().__setattr__("errors", errors if not success else None)

    def __setattr__(self, name, value):
        msg = "'%s' has no attribute %s" % (self.__class__, name)
        raise AttributeError(msg)
