import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  const mockOnClick = jest.fn();

  const renderComponent = () => {
    const defaultProps = {
      children: "Click Me",
      onClick: mockOnClick,
    };

    render(<Button {...defaultProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders button text", () => {
    renderComponent();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByText("Click Me"));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
