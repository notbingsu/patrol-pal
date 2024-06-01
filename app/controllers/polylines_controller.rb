class PolylinesController < ApplicationController
  before_action :set_polyline, only: %i[ show new create edit update destroy ]

  # GET /polylines or /polylines.json
  def index
    @polylines = Polyline.all
    render json: @polylines
  end

  # GET /polylines/1 or /polylines/1.json
  def show
  end

  # GET /polylines/new
  def new
    @polyline = Polyline.new
  end

  # GET /polylines/1/edit
  def edit
  end

  # POST /polylines or /polylines.json
  def create
    @polyline = Polyline.new(polyline_params)

    respond_to do |format|
      if @polyline.save
        format.html { redirect_to polyline_url(@polyline), notice: "Polyline was successfully created." }
        format.json { render :show, status: :created, location: @polyline }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @polyline.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /polylines/1 or /polylines/1.json
  def update
    respond_to do |format|
      if @polyline.update(polyline_params)
        format.html { redirect_to polyline_url(@polyline), notice: "Polyline was successfully updated." }
        format.json { render :show, status: :ok, location: @polyline }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @polyline.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /polylines/1 or /polylines/1.json
  def destroy
    @polyline.destroy!

    respond_to do |format|
      format.html { redirect_to polylines_url, notice: "Polyline was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def delete_all
    Polyline.delete_all
    redirect_to polylines_url, notice: "All polylines were successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_polyline
      @polyline = Polyline.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def polyline_params
      params.require(:polyline).permit(:encoding)
    end
end
