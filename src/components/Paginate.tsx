'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import ResponsivePagination from 'react-responsive-pagination';
import { dropEllipsis } from 'react-responsive-pagination/narrowBehaviour';

type Props = {
  id: string,
  totalPage: number
}

function Paginate({ id, totalPage }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get('page');

  const onPageChange = (page: number) => {
    router.push(`/manga/${id}?page=${page}`);
  }

  return (
    <ResponsivePagination total={totalPage} current={page && parseInt(page) || 1} onPageChange={onPageChange} className='btn-group' pageItemClassName='btn p-0' pageLinkClassName='p-4' activeItemClassName='btn-active' disabledItemClassName="btn-disabled" narrowBehaviour={dropEllipsis}/>
  )
}

export default Paginate