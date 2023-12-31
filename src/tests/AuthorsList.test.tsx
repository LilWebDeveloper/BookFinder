import { render, screen } from "@testing-library/react";
import AuthorList, {authors} from "../components/Authors/AuthorsList";

test("AuthorList renders authors correctly", () => {
  const mockBreadcrumb = jest.fn();
  const mockBooks: never[] = [];

  render(<AuthorList isLoading={false} breadcrumb={mockBreadcrumb} books={mockBooks} />);

  for (const author of authors) {
    const imgElement = screen.getByAltText(author.fullName);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", author.img);

    const titleElement = screen.getByText(author.fullName);
    expect(titleElement).toBeInTheDocument();
  }

  const authorTitle = authors[0].fullName;
  const infoButton = screen.getByLabelText(`info about ${authorTitle}`);
  infoButton.click();

  expect(mockBreadcrumb).toHaveBeenCalledWith(authorTitle);
});