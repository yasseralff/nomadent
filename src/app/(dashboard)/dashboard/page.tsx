"use client";

import React from 'react'

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div id="header" className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-semibold text-2xl">Dashboard</p>
                    <p className="font-light text-sm">Monitor your spending habits.</p>
                </div>
                <div className="w-1/2 h-1 bg-neutral-800 rounded-xl p-4 border-2 border-gray-400"></div>
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
