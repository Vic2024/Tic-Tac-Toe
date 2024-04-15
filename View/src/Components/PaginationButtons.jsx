/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate'
import Next from '../Icons/Next'
import Prev from '../Icons/Prev'
export default function PaginationButtons({ handlePage, page, pageCount }) {
    const showNextButton = page !== pageCount - 1
    const showPrevButton = page !== 0
    const handlePageClick = ({ selected }) => handlePage(selected)

    return (
        <div>
            <ReactPaginate
                breakLabel={<span className='mr-4'>...</span>}
                nextLabel={
                    showNextButton ? (
                        <span className='w-10 h-10 flex items-center justify-center bg-secondary dark:bg-primary rounded-md text-primary dark:text-secondary'>
                            <Next />
                        </span>
                    ) : null
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={
                    showPrevButton ? (
                        <span className='w-10 h-10 flex items-center justify-center bg-secondary dark:bg-primary rounded-md text-primary dark:text-secondary mr-4'>
                            <Prev />
                        </span>
                    ) : null
                }
                containerClassName='flex items-center justify-center'
                pageClassName='block border- border-solid border-secondary dark:border-primary hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary 
               w-10 h-10 flex items-center justify-center rounded-md transition-all mr-4'
                activeClassName='bg-secondary dark:bg-primary text-primary dark:text-secondary transition-all'
            />
        </div >
    )
}