package core

type VatValidationError struct {
	IsVatValidationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewVatValidationError(code string, msg string, ctx *Context) *VatValidationError {
	return &VatValidationError{
		IsVatValidationError: true,
		Sdk:              "VatValidation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *VatValidationError) Error() string {
	return e.Msg
}
