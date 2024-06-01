class ReportsController < ApplicationController
  before_action :set_report, only: %i[ show edit update destroy ]

  # GET /reports or /reports.json
  def index
    @reports = Report.all
    respond_to do |format|
      format.html # Render HTML normally
      format.json { render json: @reports } # Respond with JSON data
    end
    @locations = Location.all
  end

  # GET /reports/1 or /reports/1.json
  def show
  end

  # GET /reports/new
  def new
    @report = Report.new
  end

  # GET /reports/1/edit
  def edit
  end

  # POST /reports or /reports.json
  def create
    @report = Report.new(report_params)

    respond_to do |format|
      if @report.save
        format.html { redirect_to report_url(@report), notice: "Report was successfully created." }
        format.json { render :show, status: :created, location: @report }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reports/1 or /reports/1.json
  def update
    respond_to do |format|
      if @report.update(report_params)
        format.html { redirect_to report_url(@report), notice: "Report was successfully updated." }
        format.json { render :show, status: :ok, location: @report }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reports/1 or /reports/1.json
  def destroy
    @report.destroy!

    respond_to do |format|
      format.html { redirect_to reports_url, notice: "Report was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def submit_reports
    gateway_url = "https://patrol-pal-route-optimisation-gateway-6vhrt1mo.an.gateway.dev"
    api_key = "AIzaSyARTCBV8pAR9OwEGjutqbosWJxN5xolCik"
    url = "#{gateway_url}/optimise-route?key=#{api_key}"
    test_request = {
    "police_station": {
        "latitude": 1.4294854895835194,
        "longitude": 103.84014800478174
    },
    "hotspots": [
        {
            "latitude": 1.4210816436674003,
            "longitude": 103.84761568650755
        },
        {
            "latitude": 1.4251709344391268,
            "longitude": 103.84476571069965
        },
        {
            "latitude": 1.424407006907169,
            "longitude": 103.84098276837128
        },
        {
            "latitude": 1.425038977195743,
            "longitude": 103.8298203106997
        },
        {
            "latitude": 1.4182852241270225,
            "longitude": 103.8410208665204
        },
        {
            "latitude": 1.4143117474473463,
            "longitude": 103.8307012376845
        },
        {
            "latitude": 1.4239741964823807,
            "longitude": 103.83678755911649
        },
        {
            "latitude": 1.4268853888536341,
            "longitude": 103.84922392217099
        },
        {
            "latitude": 1.4314624730771077,
            "longitude": 103.84505305302795
        },
        {
            "latitude": 1.4156091006464437,
            "longitude": 103.83967627842229
        }
    ],
    "start_time" => "2024-05-30T00:00:00.000Z",
    "end_time" => "2024-05-31T06:00:00.000Z"
}
    response = HTTParty.post(url, body: test_request.to_json, headers: { 'Content-Type' => 'application/json' })
    if response.code == 200
      result = JSON.parse(response.body)

      # Write response body to a JSON file
      File.open('out/output.json', 'w') do |file|
        file.write(JSON.pretty_generate(result))
      end
    else
      # Handle the error
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def report_params
      params.require(:report).permit(:title, :body, :lat, :lng, :time)
    end
end
