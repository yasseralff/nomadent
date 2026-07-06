"use client";

import React from 'react'

export default function ExpensesPage() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div id="header" className="flex flex-row justify-between items-center w-full">
                <div className="">
                    <p className="font-semibold text-2xl">Expense Tracking</p>
                    <p className="font-light text-sm">Monitor your spending habits.</p>
                </div>
                <button onClick={() => {
                    console.log("add expenses");
                }} className="flex flex-row items-center gap-2 cursor-pointer bg-orange-500 p-2 rounded-md font-sora text-sm font-semibold">
                    <div className="">+</div>
                    <div className="">Add Expenses</div>
                </button>
            </div>
            <div id="content" className="flex flex-row gap-4">
                <div className="w-2/3 h-[40vh] bg-neutral-800 rounded-xl p-4 border-2 border-gray-400"></div>
                <div className="w-1/3 h-[40vh] flex flex-col gap-4">
                    <div className="h-1/2 bg-neutral-800 rounded-xl p-4 border-2 border-gray-400"></div>
                    <div className="h-1/2 bg-neutral-800 rounded-xl p-4 border-2 border-gray-400"></div>
                </div>
            </div>
            <div id="content2" className="">
                <div className=""></div>
                <div className=""></div>
            </div>

        </div>
    )
}
