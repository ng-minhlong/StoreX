export function BnplWidget({ price }: { price: number }) {
    const installment = (price / 4).toFixed(2)
    return (
        <div className="text-xs flex flex-wrap items-center gap-1 mt-2 mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Pay in 4 interest-free payments</span>
            of <span className="font-bold">${installment}</span> with
            <span className="font-extrabold italic mx-1">Klarna.</span>
            <span className="underline cursor-pointer opacity-80 hover:opacity-100">Learn more</span>
        </div>
    )
}
