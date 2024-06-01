require "application_system_test_case"

class PolylinesTest < ApplicationSystemTestCase
  setup do
    @polyline = polylines(:one)
  end

  test "visiting the index" do
    visit polylines_url
    assert_selector "h1", text: "Polylines"
  end

  test "should create polyline" do
    visit polylines_url
    click_on "New polyline"

    fill_in "Encoding", with: @polyline.encoding
    click_on "Create Polyline"

    assert_text "Polyline was successfully created"
    click_on "Back"
  end

  test "should update Polyline" do
    visit polyline_url(@polyline)
    click_on "Edit this polyline", match: :first

    fill_in "Encoding", with: @polyline.encoding
    click_on "Update Polyline"

    assert_text "Polyline was successfully updated"
    click_on "Back"
  end

  test "should destroy Polyline" do
    visit polyline_url(@polyline)
    click_on "Destroy this polyline", match: :first

    assert_text "Polyline was successfully destroyed"
  end
end
