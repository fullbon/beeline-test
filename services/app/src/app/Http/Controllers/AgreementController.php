<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgreementRequest;
use App\Http\Requests\UpdateAgreementRequest;
use App\Models\Agreement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class AgreementController extends Controller
{
    /**
     * Получить список всех договоров
     * @return Response
     */
    public function index(): Response
    {
        return response(['data' => Agreement::all()]);
    }

    /**
     * Добавить договор
     * @param StoreAgreementRequest $request
     * @return Response
     */
    public function store(StoreAgreementRequest $request): Response
    {
        $agreement = new Agreement($request->all());
        $agreement->save();

        return response(['id' => $agreement->getAttribute('id')]);
    }

    /**
     * Обновить договор
     * @param $id
     * @param UpdateAgreementRequest $request
     * @return Response
     */
    public function update($id, UpdateAgreementRequest $request): Response
    {
        $agreement = Agreement::query()
            ->find($id);

        if (is_null($agreement)) {
            return response(['message' => 'Договор не найден'], 404);
        }

        $agreement->fill($request->all());
        $agreement->save();

        return response(['id' => $id]);
    }

    /**
     * Удалить договор
     * @param $id
     * @return Response
     */
    public function delete($id): Response
    {
        $agreement = Agreement::query()
            ->find($id);

        if (is_null($agreement)) {
            return response(['message' => 'Договор не найден'], 404);
        }

        $agreement->delete();

        return response(['success' => true]);
    }
}
