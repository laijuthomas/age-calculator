'use client';
import { useForm } from "react-hook-form"
import React, { useState } from 'react'

type Inputs = {
  day: number
  month: number
  year: number
}

export default function App() {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit = (data) => {
    var d1 = data.day;
    var m1 = data.month;
    var y1 = data.year;
    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(d1 > d2){
      d2 = d2 + month[m2 - 1];
      m2 = m2 - 1;
    }
    if(m1 > m2){
      m2 = m2 + 12;
      y2 = y2 - 1;
    }
    
    setDay(d2 - d1);
    setYear(y2 - y1)
    setMonth(m2 - m1)
  }
  const inputCss = 'appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white';
  const labelCss = 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
  return (
    <div className="mx-auto grid max-w-7xl mt-6 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 pr-3 mb-6 md:mb-0">
            <label className={errors.day ? 'text-red-500 ' + labelCss : labelCss} htmlFor="grid-day">
              Day
            </label>
            <input {...register('day', {
              min: { value: 1, message: 'Minimum value required is 1.' },
              max: { value: 31, message: 'Maximum value allowed is 31.' },
              pattern: {
                value: /^[0-9]*[1-9][0-9]*$/,
                message: "Entered value must be a vaild day.",
              },
              required: 'Day is required.',
            })} className={errors.day ? 'border-red-500 ' + inputCss : inputCss} id="grid-day" type="text" placeholder="Day" />
            {errors.day && <p className="text-red-500 text-xs italic">{errors.day.message}</p>}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className={errors.month ? 'text-red-500 ' + labelCss : labelCss} htmlFor="grid-month">
              Month
            </label>
            <input {...register('month', {
              required: 'Month is required.',
              min: { value: 1, message: 'Minimum value required is 1.' },
              max: { value: 12, message: 'Maximum value allowed is 12.' },
            })} className={errors.month ? 'border-red-500 ' + inputCss : inputCss} id="grid-month" type="text" placeholder="Month" />
            {errors.month && <p className="text-red-500 text-xs italic">{errors.month.message}</p>}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className={errors.year ? 'text-red-500 ' + labelCss : labelCss} htmlFor="grid-year">
              Year
            </label>
            <input {...register('year', {
              required: 'Year is required.',
              maxLength: { value: 4, message: 'Maximum 4 character is allowd.' },
            })} className={errors.year ? 'border-red-500 ' + inputCss : inputCss} id="grid-year" type="text" placeholder="Year" />
            {errors['year'] && <p className="text-red-500 text-xs italic">{errors.year.message}</p>}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="md:w-1/2">
            <button className="shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Submit
            </button>
          </div>
        </div>
        <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span className="text-purple-600">{year ? year : '--'}</span> years
        </p>
        <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span className="text-purple-600">{month ? month : '--'}</span> month
        </p>
        <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span className="text-purple-600">{day ? day : '--'}</span> days
        </p>
      </form>
    </div>
  )
}