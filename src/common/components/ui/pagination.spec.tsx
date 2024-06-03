import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./pagination";

describe('Pagination', () => {

  const onPageCHangeCallback = vi.fn();

  it('should display the right amount of pages and results.', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => { }}
      />
    )

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
  });

  it('should be able to navigate to next page.', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageCHangeCallback}
      />
    )

    const nextPageButton = wrapper.getByRole("button", {
      name: 'Próxima página',
    })

    await user.click(nextPageButton);

    expect(onPageCHangeCallback).toHaveBeenCalledWith(1);
  });

  it('should be able to navigate to previous page.', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageCHangeCallback}
      />
    )

    const previousPageButton = wrapper.getByRole("button", {
      name: 'Página anterior',
    })

    await user.click(previousPageButton);

    expect(onPageCHangeCallback).toHaveBeenCalledWith(4);
  });

  it('should be able to navigate to first page.', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageCHangeCallback}
      />
    )

    const firstPageButton = wrapper.getByRole("button", {
      name: 'Primeira página',
    })

    await user.click(firstPageButton);

    expect(onPageCHangeCallback).toHaveBeenCalledWith(0);
  });

  it('should be able to navigate to last page.', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageCHangeCallback}
      />
    )

    const firstPageButton = wrapper.getByRole("button", {
      name: 'Última página',
    })

    await user.click(firstPageButton);

    expect(onPageCHangeCallback).toHaveBeenCalledWith((200 / 10) - 1);
  });
});