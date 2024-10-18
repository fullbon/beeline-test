<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcessRequest;
use App\Http\Requests\UpdateProcessRequest;
use App\Models\Process;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Response;

class ProcessController extends Controller
{
    /**
     * Получить список всех процессов
     * @param $agreementId
     * @return Response
     */
    public function index($agreementId): Response
    {
        $processes = Process::query()
            ->whereHas('agreement', function (Builder $query) use ($agreementId) {
                $query->where('id', $agreementId);
            })
            ->get();

        return response($processes);
    }

    /**
     * Добавить процесс
     * @param StoreProcessRequest $request
     * @return Response
     */
    public function store(StoreProcessRequest $request): Response
    {
        $agreement = new Process($request->all());
        $agreement->save();

        return response(['id' => $agreement->getAttribute('id')]);
    }

    /**
     * Обновить процесс
     * @param $id
     * @param UpdateProcessRequest $request
     * @return Response
     */
    public function update($id, UpdateProcessRequest $request): Response
    {
        $agreement = Process::query()
            ->find($id);

        if (is_null($agreement)) {
            return response(['message' => 'Процесс не найден'], 404);
        }

        $agreement->fill($request->all());
        $agreement->save();

        return response(['id' => $id]);
    }

    /**
     * Удалить процесс
     * @param $id
     * @return Response
     */
    public function delete($id): Response
    {
        $agreement = Process::query()
            ->find($id);

        if (is_null($agreement)) {
            return response(['message' => 'Процесс не найден'], 404);
        }

        $agreement->delete();

        return response(['success' => true]);
    }

    public function getById($id): Response
    {
        return Process::query()
            ->find($id);
    }
}
