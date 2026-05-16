<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;

class GatewayController extends Controller
{
    private function logRequest(Request $request)
    {
        \Log::info('API Gateway Request', [
            'method' => $request->method(),
            'endpoint' => $request->path(),
        ]);
    }

    public function getStudents(Request $request)
    {
        $this->logRequest($request);
        $studentController = new StudentController;

        return response()->json([
            'gateway' => 'API Gateway',
            'message' => 'Request forwarded to Student Service',
            'result' => $studentController->index()->getData(),
        ]);
    }

    public function createStudent(Request $request)
    {
        $this->logRequest($request);
        $studentController = new StudentController;

        return $studentController->store($request);
    }

    public function updateStudent(Request $request, $nim)
    {
        $this->logRequest($request);
        $studentController = new StudentController;

        return $studentController->update($request, $nim);
    }

    public function deleteStudent(Request $request, $nim)
    {
        $this->logRequest($request);
        $studentController = new StudentController;

        return $studentController->destroy($nim);
    }

    public function getProfile(Request $request)
    {
        $this->logRequest($request);
        $authController = new AuthController;

        return $authController->profile($request);
    }

    public function getAdminDashboard(Request $request)
    {
        $this->logRequest($request);

        return response()->json(['message' => 'Welcome to Admin Dashboard via Gateway']);
    }

    public function getUserDashboard(Request $request)
    {
        $this->logRequest($request);

        return response()->json(['message' => 'Welcome to User Dashboard via Gateway']);
    }
}
