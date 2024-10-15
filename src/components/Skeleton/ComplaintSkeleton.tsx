
const ComplaintSkeleton = () => {
    return (
        <div role="status" className="animate-pulse flex flex-col justify-center items-center w-full my-10 space-y-0 rtl:space-x-reverse">
            <div className=" my-10 h-auto w-full rounded-xl bg-gray-300 flex-col rtl:space-x-reverse flex items-center">
                        <div className="h-10 bg-gray-800 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-400 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-400 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-400 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-400 dark:bg-gray-700 w-full"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>


    )
}
export default ComplaintSkeleton
