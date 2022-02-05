// Ссылка на вебинар: https://disk.yandex.ru/d/vegboPekzVLrYQ/Вебинар%20-%20разбор%20курсового%20проекта%20(10-12%20спринт)%2002.11.21.mp4

import React, { useCallback } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // К полям старого объекта добавляется или оновляется соответствующее поле со значением
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation(defaultValues) {
  // Храним данные формы в объектах - стейт переменных
  const [values, setValues] = React.useState({...defaultValues});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  console.log(values);

  const handleChange = (event) => {
    // Получаем значение и имя поля
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
