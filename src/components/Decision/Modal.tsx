import { INewsApi } from '@/interfaces'
import { Dialog } from '@headlessui/react'

interface IProps {
    openDecision: boolean,
    setOpenDecision: (val: boolean) => void,
    news: INewsApi,
}
export default function Modal({ openDecision, setOpenDecision, news }: IProps) {

    return (
        <Dialog open={openDecision} onClose={setOpenDecision} className="relative z-10">
            <Dialog.Backdrop
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 flex justify-center items-center z-10 w-screen overflow-y-auto">
                <div className="flex justify-center p-4 text-center sm:items-center sm:p-0">
                    <Dialog.Panel
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                                    <Dialog.Title as="h2" className="text-2xl font-semibold leading-6 text-primary">
                                        {news.title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">
                                            رقم القرار: {news.decision_id}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-gray-900">
                                            {news.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}