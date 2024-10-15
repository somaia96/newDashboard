
const FormAddSkeleton = ({ serv = false }: { serv?: boolean }) => {
    return (
        <div role="status" className="animate-pulse flex flex-col justify-center items-center w-full mt-10 p-5 space-y-0 rtl:space-x-reverse">
            {serv && <div className='flex justify-center items-center gap-10 w-full mb-5'>
                <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48 mb-4"></div>
            </div>}
            <div className=" my-10 h-auto w-[800px] rounded-xl bg-gray-300 p-5 flex-col space-y-0 space-x-8 rtl:space-x-reverse flex items-center">
                <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="w-full flex flex-col gap-3 p-5">
                    <div className="flex justify-between items-center">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded-xl dark:bg-gray-700 w-[600px] mb-2.5"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                        <div className="h-20 bg-gray-200 rounded-xl dark:bg-gray-700 w-[600px] mb-2.5"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                        <div className="h-40 bg-gray-200 rounded-xl dark:bg-gray-700 w-[600px] mb-2.5"></div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>


    )
}

export default FormAddSkeleton
