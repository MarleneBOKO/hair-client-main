<script setup>

</script>

<template>
    <div class="bg-gray-300">
        <div class="flex flex-row justify-between w-full bg-white border border-black p-5 shadow-lg" style="height: 10%;" >
            <div class="flex flex-row gap-2 items-center">
                <span class="font-bold text-lg">HS</span>
                <h1>Hair Style</h1>
            </div>
            <div class="flex items-center  gap-4">
                <div class="flex gap-4 justify-between items-center ">
                    <div>
                        <form class="max-w-md mx-auto">   
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" class="block h-6 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl " placeholder="Search " required />
                            </div>
                        </form>

                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M38.105 33.705V22.486A13.694 13.694 0 0 0 28.1 9.33v-1.1a3.73 3.73 0 1 0-7.46 0v1.099a13.694 13.694 0 0 0-10.005 13.157v11.22L7.34 38.958a1.166 1.166 0 0 0 .988 1.786h31.344a1.166 1.166 0 0 0 1.048-1.678Zm-17.787 7.04a3.839 3.839 0 0 0 7.364 0"/>
                        </svg>
                    </div>
                    <div class="flex gap-3 " >
                        <img src="/images/modal/télécharger (20) 1.png" alt="" class="w-10 h-10 rounded-full">
                        <div class="flex flex-col text-xs">
                            <h4>Marlene</h4>
                            <span>Super Admin</span>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="flex flex-col p-5 bg-white h-screen gap-6" style="width: 15%;">
                <div class="flex flex-col items-center justify-center">
                    <img src="/images/modal/Chic.jpeg" alt="" class="w-12 h-12 rounded-full">

                </div>
                <div class="flex flex-col ">
                    <nav class="text-black gap-14">
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19.5 10a.5.5 0 0 0-1 0zm-14 0a.5.5 0 0 0-1 0zm15.146 2.354a.5.5 0 0 0 .708-.708zM12 3l.354-.354a.5.5 0 0 0-.708 0zm-9.354 8.646a.5.5 0 0 0 .708.708zM7 21.5h10v-1H7zM19.5 19v-9h-1v9zm-14 0v-9h-1v9zm15.854-7.354l-9-9l-.708.708l9 9zm-9.708-9l-9 9l.708.708l9-9zM17 21.5a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm-10-1A1.5 1.5 0 0 1 5.5 19h-1A2.5 2.5 0 0 0 7 21.5z"/>
                            </svg>
                            <span>Home</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M25.822 10.124a10 10 0 0 0-19.644 0A7.496 7.496 0 0 0 7.5 25H8v-2h-.5a5.496 5.496 0 0 1-.377-10.98l.836-.057l.09-.833a7.998 7.998 0 0 1 15.902 0l.09.833l.836.058A5.496 5.496 0 0 1 24.5 23H24v2h.5a7.496 7.496 0 0 0 1.322-14.876"/><path fill="currentColor" d="M23 22v-2h-2.101a5 5 0 0 0-.732-1.753l1.49-1.49l-1.414-1.414l-1.49 1.49A5 5 0 0 0 17 16.101V14h-2v2.101a5 5 0 0 0-1.753.732l-1.49-1.49l-1.414 1.414l1.49 1.49A5 5 0 0 0 11.101 20H9v2h2.101a5 5 0 0 0 .732 1.753l-1.49 1.49l1.414 1.414l1.49-1.49a5 5 0 0 0 1.753.732V28h2v-2.101a5 5 0 0 0 1.753-.732l1.49 1.49l1.414-1.414l-1.49-1.49A5 5 0 0 0 20.899 22Zm-7 2a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"/>
                            </svg>
                            <span>Services</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <span>Profile</span>

                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21">
                                <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke-width="0.93" d="M7.5.5c.351 0 .697.026 1.034.076l.508 1.539c.445.127.868.308 1.26.536l1.46-.704c.517.397.977.865 1.365 1.389l-.73 1.447c.221.396.395.822.514 1.27l1.53.533a7.066 7.066 0 0 1-.017 1.948l-1.539.508a5.567 5.567 0 0 1-.536 1.26l.704 1.46a7.041 7.041 0 0 1-1.389 1.365l-1.447-.73a5.507 5.507 0 0 1-1.27.514l-.533 1.53a7.066 7.066 0 0 1-1.948-.017l-.508-1.539a5.567 5.567 0 0 1-1.26-.536l-1.46.704a7.041 7.041 0 0 1-1.365-1.389l.73-1.447a5.565 5.565 0 0 1-.514-1.27l-1.53-.534a7.066 7.066 0 0 1 .017-1.947l1.539-.508c.127-.445.308-.868.536-1.26l-.704-1.46a7.041 7.041 0 0 1 1.389-1.365l1.447.73a5.507 5.507 0 0 1 1.27-.514l.534-1.53A7.06 7.06 0 0 1 7.5.5"/>
                                <circle cx="7.5" cy="7.5" r="3"/></g>
                            </svg>
                            <span>Setting</span>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="flex flex-col gap-9 p-6 flex-1">
            <div class=" flex gap-2">
                <h1>Dashboard</h1>
                <div class="flex  gap-2">
                    <span>Home</span>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span>Dashboard</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between gap-6 ">
                <div class="bg-white shadow-sm rounded-md flex justify-center items-center gap-3 p-3 w-44 h-28">
                    <div class="flex justify-center items-center bg-green-200 rounded-full w-14 h-14 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
                            <path fill="currentColor" d="M16.43 16.69a7 7 0 1 1 7-7a7 7 0 0 1-7 7m0-11.92a5 5 0 1 0 5 5a5 5 0 0 0-5-5M22 17.9a25.41 25.41 0 0 0-16.12 1.67a4.06 4.06 0 0 0-2.31 3.68v5.95a1 1 0 1 0 2 0v-5.95a2 2 0 0 1 1.16-1.86a22.91 22.91 0 0 1 9.7-2.11a23.58 23.58 0 0 1 5.57.66Zm.14 9.51h6.14v1.4h-6.14z"/><path fill="currentColor" d="M33.17 21.47H28v2h4.17v8.37H18v-8.37h6.3v.42a1 1 0 0 0 2 0V20a1 1 0 0 0-2 0v1.47H17a1 1 0 0 0-1 1v10.37a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.47a1 1 0 0 0-1-1"/>
                        </svg> 
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gray-100 font-light">Reservation</span>
                        <span class="text-black font-bold">3</span>
                    </div>
                </div>
                <div class="bg-white shadow-sm rounded-md flex justify-center items-center gap-3 p-3 w-44 h-">
                    <div class="flex justify-center items-center bg-green-200 rounded-full w-14 h-14 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
                            <path fill="currentColor" d="M896 512v128H512V512zM512 896V768h384v128zm0 256v-128h256v128zM384 512v128H256V512zm0 256v128H256V768zm-128 384v-128h128v128zM128 128v1792h640v128H0V0h1115l549 549v219h-128V640h-512V128zm1024 91v293h293zm640 805h256v1024H896V1024h256V896h128v128h384V896h128zm128 896v-512h-896v512zm0-640v-128h-896v128z"/>
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gray-300 font-light">Reservation</span>
                        <span class="text-black font-bold">3</span>
                    </div>
                </div>
                <div class="bg-white shadow-sm rounded-md flex justify-center items-center gap-3 p-3 w-44 h-28">
                    <div class="flex justify-center items-center bg-green-200 rounded-full w-14 h-14 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M7.197 25.9c.298.388.672.532 1.193.532h.72c.67 0 1.213-.543 1.213-1.213v-.005c0-.67-.543-1.213-1.213-1.213h-.795c-.67 0-1.214-.544-1.214-1.215h0c0-.672.545-1.217 1.217-1.217h.716c.52 0 .894.145 1.192.533M13.178 24h1.585m.423 2.432h-2.431v-4.863h2.431m2.432 4.863V21.57h1.592c.9 0 1.63.731 1.63 1.633s-.73 1.633-1.63 1.633h-1.592m1.592 0l1.592 1.595m5.691-4.862l-1.611 4.863l-1.611-4.863m5.654 0v4.863m5.653-1.61a1.61 1.61 0 1 1-3.222 0V23.18c0-.89.721-1.61 1.611-1.61h0c.89 0 1.611.72 1.611 1.61m2.432.82h1.585m.846 2.432H37.01v-4.863h2.431M28.874 42.5l-4.44-13.662m-3.142-9.666L16.848 5.5m12.026 37l4.43-13.631m3.174-9.768l4.421-13.6M16.848 5.5H40.9"/>
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gray-100 font-light">Reservation</span>
                        <span class="text-black font-bold">3</span>
                    </div>
                </div>
                <div class="bg-white shadow-sm rounded-md flex justify-center items-center gap-3 p-3 w-44 h-28">
                    <div class="flex justify-center items-center bg-green-200 rounded-full w-14 h-14 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3 19q-.425 0-.712-.288T2 18t.288-.712T3 17h18q.425 0 .713.288T22 18t-.288.713T21 19zm0-3v-1q0-3.2 1.963-5.65T10 6.25V6q0-.825.588-1.412T12 4t1.413.588T14 6v.25q3.1.65 5.05 3.1T21 15v1zm2.05-2h13.9q-.35-2.6-2.325-4.3T12 8T7.388 9.7T5.05 14M12 14"/>
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gray-100 font-light">Reservation</span>
                        <span class="text-black font-bold">3</span>
                    </div>
                </div>
                <div class="bg-white shadow-sm rounded-md flex justify-center items-center gap-3 p-3 w-44 h-28">
                    <div class="flex justify-center items-center bg-green-200 rounded-full w-14 h-14 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3 19q-.425 0-.712-.288T2 18t.288-.712T3 17h18q.425 0 .713.288T22 18t-.288.713T21 19zm0-3v-1q0-3.2 1.963-5.65T10 6.25V6q0-.825.588-1.412T12 4t1.413.588T14 6v.25q3.1.65 5.05 3.1T21 15v1zm2.05-2h13.9q-.35-2.6-2.325-4.3T12 8T7.388 9.7T5.05 14M12 14"/>
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gray-100 font-light">Reservation</span>
                        <span class="text-black font-bold">3</span>
                    </div>
                </div>
            </div>
            <div></div>
            </div>
    </div>
    </div>
</template>

  

<style lang="scss" scoped>     

</style>