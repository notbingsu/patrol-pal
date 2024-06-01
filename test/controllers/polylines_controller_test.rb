require "test_helper"

class PolylinesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @polyline = polylines(:one)
  end

  test "should get index" do
    get polylines_url
    assert_response :success
  end

  test "should get new" do
    get new_polyline_url
    assert_response :success
  end

  test "should create polyline" do
    assert_difference("Polyline.count") do
      post polylines_url, params: { polyline: { encoding: @polyline.encoding } }
    end

    assert_redirected_to polyline_url(Polyline.last)
  end

  test "should show polyline" do
    get polyline_url(@polyline)
    assert_response :success
  end

  test "should get edit" do
    get edit_polyline_url(@polyline)
    assert_response :success
  end

  test "should update polyline" do
    patch polyline_url(@polyline), params: { polyline: { encoding: @polyline.encoding } }
    assert_redirected_to polyline_url(@polyline)
  end

  test "should destroy polyline" do
    assert_difference("Polyline.count", -1) do
      delete polyline_url(@polyline)
    end

    assert_redirected_to polylines_url
  end
end
