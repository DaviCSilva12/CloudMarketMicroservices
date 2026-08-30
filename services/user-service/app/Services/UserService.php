<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;

class UserService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {}

    public function getUserById(int $id)
    {
        return $this->userRepository->findById($id);
    }

    public function createUser(array $data)
    {
        // A senha será hasheada automaticamente pelo cast 'password' => 'hashed' no Model User do Laravel 11.
        return $this->userRepository->create($data);
    }
}
